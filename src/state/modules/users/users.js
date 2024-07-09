import app from "@/firebaseInit";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);
export const state = {
  profileUser: null,
};

export const mutations = {
  fetchProfileUser(state, data) {
    state.profileUser = data;
  },
};

export const actions = {
  async getProfileUser({ commit }, username) {
    const dbUsers = collection(db, 'users')
    const allUserDocs = await getDocs(dbUsers)
    const allUsers = allUserDocs.docs.map((doc) => {
        return doc.data()
    })
    const getUser = allUsers.filter((user) => {
        return user.username === username
    })
    commit('fetchProfileUser', getUser)
  },
};
