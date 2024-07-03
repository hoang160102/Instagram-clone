import app from "@/firebaseInit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useToast } from "vue-toastification";
import router from "@/router";
const toast = useToast();
const auth = getAuth(app);
const db = getFirestore(app);

export const state = {
  user: null,
  errLogin: null,
};

export const mutations = {
  getErrorLogin(state, data) {
    state.errLogin = data;
  },
  currentUser(state, data) {
    state.user = data;
  },
  logoutUser(state) {
    state.user = null;
  },
};

export const actions = {
  async signUp(_, newUser) {
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((result) => {
        toast.success("Register Successfully");
        setDoc(doc(db, "users", result.user.uid), {
          id: result.user.uid,
          fullName: newUser.fullName,
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
          profilePicture: "",
          bio: "",
          createdAt: Date.now(),
          followers: [],
          following: [],
          post: [],
          savedPosts: [],
        });
        setTimeout(() => {
          router.push({ name: "Login" });
        }, 1500);
      })
      .catch((err) => {
        if (err.code.includes("email-already-in-use")) {
          toast.error("Email was already used");
        }
      });
  },
  async login({ commit }, user) {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        toast.success("Login Successfully");
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 1500);
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code.includes("auth/invalid-credential")) {
          commit("getErrorLogin", "Email or password is incorrect");
        }
      });
  },
  async getCurrentUser({ commit }) {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    try {
      const currentId = auth.currentUser.uid;
      const getUser = userSnapshot.docs.filter((doc) => {
        return doc.id === currentId;
      });
      const currentUser = {
        id: currentId,
        username: getUser[0].data().username,
        fullName: getUser[0].data().fullName,
        email: getUser[0].data().email,
        password: getUser[0].data().password,
        bio: getUser[0].data().bio,
        createdAt: getUser[0].data().createdAt,
        followers: getUser[0].data().followers,
        following: getUser[0].data().following,
        post: getUser[0].data().post,
        profilePicture: getUser[0].data().profilePicture,
      };
      await commit("currentUser", currentUser)
    } catch (err) {
      return err;
    }
  },
  async logout({ commit }) {
    await signOut(auth).then(() => {
      commit("logoutUser");
      router.push({ name: "Login" });
    });
  },
  async loginWithGoogle({commit}) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid)
      const userSnapshot = await getDoc(userRef)
      if (userSnapshot.exists()) {
        const userDoc = userSnapshot.data()
        console.log(userDoc)
        await commit("currentUser", userDoc)
        router.push({ name: "Home" });
      }
      else {
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          fullName: user.displayName,
          email: user.email,
          username: user.displayName,
          password: '',
          profilePicture: user.photoURL,
          bio: "",
          createdAt: Date.now(),
          followers: [],
          following: [],
          post: [],
          savedPosts: [],
        });
        router.push({ name: "Home" });
      }
    } catch (err) {
      console.error("Error during sign in or Firestore write:", err);
    }
  }
};

export const getters = {
  user: (state) => state.user,
};
