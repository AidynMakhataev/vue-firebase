<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm4 offset-sm4>
                <v-card>
                    <v-toolbar class="teal" dark>
                        <v-layout row>
                            <v-flex xs12>
                                <v-toolbar-title>Регистрация</v-toolbar-title>
                            </v-flex>
                        </v-layout>
                    </v-toolbar>
                    <v-card-text>
                        <v-container >
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-text-field label="Ваше имя" v-model.trim="name" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-text-field label="Email" v-model.trim="email" type="email" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-text-field label="Пароль" v-model.trim="password" type="password" :rules="[passwordLength]" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-text-field label="Подтвердите пароль" v-model.trim="confirmPassword" type="password"  :rules="[comparePasswords]"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-btn class="teal white--text" large round @click.prevent="register" :disabled="!formIsValid" :loading="isLoading">Регистрация</v-btn>
                                </v-flex>
                            </v-layout>
                            <v-layout row v-if="alert">
                                <v-flex xs12 sm8 offset-sm2 v-for="error in errors" :key="error.message">
                                    <v-alert error dismissible v-model="alert">{{ error }}</v-alert>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import md5 from 'md5'
    export default {
        name: 'register',
        data () {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                alert: false,
                errors: [],
                usersRef: firebase.database().ref('users'),
                isLoading: false
            }
        },
        computed: {
          comparePasswords () {
              return this.password !== this.confirmPassword ? 'Пароли не совпадают' : true;
          },
          passwordLength() {
              return this.password.length > 0 && this.password.length < 6 ? 'Минимум 6 символов' : true;
          },
          formIsValid() {
              if(this.email.length === 0 || this.name.length === 0 || this.password.length === 0 || this.confirmPassword === 0) {
                  return false;
              }
              return true;
          }

        },
        methods: {
            register () {
                if(this.formIsValid) {
                    this.isLoading = true
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {

                        user.updateProfile({
                            displayName: this.name,
                            photoURL: "http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-rapper-guy.png"
                        }).then( () => {
                            this.saveUserToUsersRef(user).then( () => {
                                this.$store.dispatch('setUser', user);
                                this.$router.push('/');
                            })
                        }, error => {
                            console.log(error);
                            this.errors.push(error.message);
                            this.isLoading = false;
                            this.alert = true;
                        })
                    }).catch(error => {
                        console.log(error);
                        this.errors.push(error.message);
                        this.isLoading = false;
                        this.alert = true;
                    })
                }
            },
            saveUserToUsersRef(user) {
                return this.usersRef.child(user.uid).set({
                    name: user.displayName,
                    avatar: user.photoURL
                })
            }
        }
    }
</script>


<style>

</style>