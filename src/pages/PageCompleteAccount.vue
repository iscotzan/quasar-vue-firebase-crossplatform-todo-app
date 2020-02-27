<template>
  <q-page
    padding
    class="q-pa-md shadow-2 rounded-borders row full-height justify-center text-center"
  >
    <div id="finishVerification">
      <h3>Congrats {{ name }}!</h3>
      <!-- <p><button @click="logOut">Log out</button></p> -->
      <p v-if="photo">FOTO:<img :src="photo" style="height: 120px" /></p>
      <p>{{ email }} is now logged in and verified</p>
    </div>
  </q-page>
</template>

<script>
import { firebaseAuth } from "./../boot/firebase";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      photo: "",
      userId: "",
      name: "",
      email: ""
    };
  },
  created() {
    var actionCode = this.$route.query.oobCode.toString();
    // console.log(actionCode);

    firebaseAuth
      .applyActionCode(actionCode)
      .then(() => {
        // console.log("TCL: created -> resp", resp);
        // alert("reload");
        firebaseAuth.currentUser.reload().then(() => {
          //   console.log("TCL: created -> reloaded", reloaded);

          //   console.log(firebaseAuth.currentUser.emailVerified);
          this.updateEmailVerified(firebaseAuth.currentUser.emailVerified);
          //   console.log(
          //     "TCL: created -> firebaseAuth.currentUser.emailVerified",
          //     firebaseAuth.currentUser.emailVerified
          //   );
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // console.log("TCL: created -> user", user);

        this.name = user.displayName;
        this.email = user.email;
        this.photo = user.photoURL;
        this.userId = user.uid;
      }
    });
  },
  methods: {
    ...mapActions("auth", ["updateEmailVerified"]),
    logOut() {
      firebaseAuth.signOut();
      this.$router.push("/auth");
    }
  }
};
</script>
