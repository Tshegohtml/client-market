const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } = require("firebase/auth");
const {  collection, addDoc, getDoc, doc } = require("firebase/firestore");
const {db,auth} = require("../config/firebase");

const SignUp = async (req, res) => {
    const { email, password, firstName } = req.body;
        try {
           const user = await createUserWithEmailAndPassword(auth, email, password);
            const docRef = await addDoc(collection(db,'Users'), {
          firstName:firstName,
          email: email,
          password:password,
            });
            res.json({ message: "User created successfully", user: user, docRef: docRef.id });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    };

    const Login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, 'Users', userCredential.user.uid))
            res.json({ message: "User logged in successfully", user: userCredential.user, userDoc
            });
        } catch(error){
            console.error(error)
            res.status(400).json({ message: error.message });
        }
    }

    const resetPassword = async (req, res) =>{
        const { email } = req.body;
        try{
            await sendPasswordResetEmail(auth, email)
            res.json({ message: "Password reset email sent" });
            }catch(error){
                console.error(error)
                res.status(400).json({message: error.message})
            }
    }
    
module.exports = {
    SignUp,
    Login,
    resetPassword
};