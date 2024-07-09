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
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { useToast } from "vue-toastification";
import router from "@/router";
const storage = getStorage();
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
        privateAccount: getUser[0].data().privateAccount,
      };
      await commit("currentUser", currentUser);
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
  async loginWithGoogle({ commit }) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userDoc = userSnapshot.data();
        console.log(userDoc);
        await commit("currentUser", userDoc);
        router.push({ name: "Home" });
      } else {
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          fullName: user.displayName,
          email: user.email,
          username: user.displayName,
          password: "",
          profilePicture: user.photoURL,
          bio: "",
          createdAt: Date.now(),
          followers: [],
          following: [],
          post: [],
          savedPosts: [],
          privateAccount: false,
        });
        router.push({ name: "Home" });
      }
    } catch (err) {
      console.error("Error during sign in or Firestore write:", err);
    }
  },
  async updateInfo(_, user) {
    const getUserFromDatabase = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(getUserFromDatabase, {
        bio: user.bio,
        username: user.username,
        fullName: user.fullName,
        privateAccount: user.privateAccount,
      });
      toast.success("Your account updated");
      setTimeout(() => {
        router.push(`/${user.username}`);
      }, 1500);
    } catch (err) {
      toast.error("Update error, please try again");
    }
  },
  async updateProfilePicture(_, file) {
    const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    let URL = "";

    try {
      if (file) {
        const reader = new FileReader();

        reader.onloadend = async () => {
        const dataURL = reader.result;

          try {
            await uploadString(storageRef, dataURL, "data_url");
            URL = await getDownloadURL(storageRef);

            const updateProfile = {
              profilePicture: URL,
            };

            await updateDoc(userDocRef, updateProfile);
          } catch (uploadError) {
            console.error("Upload error:", uploadError);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
};

export const getters = {
  user: (state) => state.user,
};
