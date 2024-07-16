import app from "@/firebaseInit";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth();
export const state = {
  profileUser: null,
  allUsers: null,
};

export const mutations = {
  fetchProfileUser(state, data) {
    state.profileUser = data;
  },
  fetchAllUsers(state, data) {
    state.allUsers = data;
  },
};

export const actions = {
  async getProfileUser({ commit }, username) {
    const dbUsers = collection(db, "users");
    const allUserDocs = await getDocs(dbUsers);
    const allUsers = allUserDocs.docs.map((doc) => {
      return doc.data();
    });
    const getUser = allUsers.filter((user) => {
      return user.username === username;
    });
    commit("fetchProfileUser", getUser);
  },
  async follow(_, id) {
    const getCurrentUserFromDatabase = doc(db, "users", auth.currentUser.uid);
    const getUserFromDatabase = doc(db, "users", id);
    try {
      await updateDoc(getCurrentUserFromDatabase, {
        following: arrayUnion(id),
      });
      await updateDoc(getUserFromDatabase, {
        followers: arrayUnion(auth.currentUser.uid),
      });
    } catch (err) {
      console.log(err);
    }
  },
  async unfollow(_, id) {
    const getCurrentUserFromDatabase = doc(db, "users", auth.currentUser.uid);
    const getUserFromDatabase = doc(db, "users", id);
    try {
      await updateDoc(getCurrentUserFromDatabase, {
        following: arrayRemove(id),
      });
      await updateDoc(getUserFromDatabase, {
        followers: arrayRemove(auth.currentUser.uid),
      });
    } catch (err) {
      console.log(err);
    }
  },
  async getAllUsers({ commit }) {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    const data = userSnapshot.docs.map((doc) => {
      return doc.data();
    });
    commit("fetchAllUsers", data);
  },
  async addRecentSearch(_, item) {
    const getCurrentUserFromDatabase = doc(db, "users", auth.currentUser.uid);
    await updateDoc(getCurrentUserFromDatabase, {
      recent: arrayUnion(item),
    });
  },
  async removeRecentSearch(_, item) {
    const getCurrentUserFromDatabase = doc(db, "users", auth.currentUser.uid)
    await updateDoc(getCurrentUserFromDatabase, {
      recent: arrayRemove(item),
    });
  },
  async removeAllRecent() {
    const getCurrentUserFromDatabase = doc(db, "users", auth.currentUser.uid)
    await updateDoc(getCurrentUserFromDatabase, {
      recent: []
    })
  }
};
