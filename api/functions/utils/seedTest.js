const {doc, collection, addDoc, getDocs, setDoc, query, where} = require("firebase/firestore")
const {auth, firestore} = require("../utils/config")
const { createUserWithEmailAndPassword } = require('firebase/auth')

exports.seedTest = async (req,res)=>{
  //seed user data
  const users = ['a', 'b', 'c', 'd', 'e']  
  const password = 'password'
  const uids = []

  console.log(users.length)

  for(var i = 0; i < users.length;i++){
    createUserWithEmailAndPassword(auth, users[i] + '@email.com', password)
    .then(cred=>{
      console.log(`Created test user`)
      uids.push(cred.uid)
    }).catch(err=>{
      console.error(`Error while creating users: ${err}`)
    })
  }

  //seed post data
  const data = {
    bookid: 'mA8A4BYWB1IC',
    title: 'Big post title',
    content: "This is seed post body",
    authorid: 'aBajlfja',
    date: Date.now(),
    upvotes: 0,
    chapter: 'Chapter 1'
    }

    for(var i = 0;i<10;i++){
      addDoc(collection(firestore, 'posts'), data).then(result=>{
        console.log('added new post')
      }).catch(err=>{
        console.log(err)
      })
    }

    res.status(200).send('ok')
}

const favorites = [
  'GNnxzQEACAAJ',
  'mA8A4BYWB1IC',
  '8CHcJQzDPCkC',
  'lFhbDwAAQBAJ',
  'eyK309uZ9o8C'
]

exports.addFavoritesToUser = (uid) => {
  const profileQuery = query(collection(firestore, 'profiles'), where('uid', '==', uid))

  getDocs(profileQuery).then(snapshots=>{
    snapshots.forEach(snapshot=>{
      const profileRef = snapshot.ref
      setDoc(profileRef, {favorites: favorites}, {merge: true})
      console.log("added new favorites to profile " + snapshot.id)
    })
  })
}
