<template>
  <q-page
    padding
    class="q-pa-md shadow-2 rounded-borders row full-height justify-center"
  >
    <div id="verificationMail">
      <h3>Account Validation</h3>
      <p>
        Hi there <strong>{{ name }}</strong
        >, we need to validate your account
      </p>
      <p>
        We've just sent you an email to <strong>{{ email }}</strong> with the
        subjet <strong>{{ subjet }}</strong>
      </p>
      <p>This link confirms your registration.</p>
      <p>
        <q-btn @click="resend" outline color="secondary"
          >Resend account validation mail</q-btn
        >
      </p>
    </div>
  </q-page>
</template>

<script>
import { firebaseAuth } from "./../boot/firebase";
export default {
  name: "verificationMail",
  data() {
    return {
      name: "",
      email: "",
      subjet: "Verify your email for Todoz"
    };
  },
  created() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
      }
    });
  },
  methods: {
    alertResent() {
      const title = "Verification email sent";
      const message = `We've just sent you an email ${
        this.email ? "to " + this.email : ""
      }, please check your inbox.`;
      this.$q
        .dialog({
          dark: true,
          title,
          message
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    resend() {
      firebaseAuth.onAuthStateChanged(user => {
        if (user && !user.emailVerified) {
          //   var actionCodeSettings = {
          //     url: "http://..../",
          //     handleCodeInApp: true
          //   };
          user
            .sendEmailVerification()
            .then(() => {
              // Email sent.

              this.alertResent();
              console.log("TCL: resend ->  Email sent");
            })
            .catch(function(error) {
              console.log("TCL: resend -> error", error);
              // An error happened.
            });
        }
      });
    }
  },
  mounted() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        this.$router.push("/");
      }
    });
  }
};
</script>
