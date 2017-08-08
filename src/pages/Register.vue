<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm4 offset-sm4>
                <v-card>
                    <v-toolbar class="cyan" dark>
                        <v-layout row>
                            <v-flex xs12>
                                <v-toolbar-title>Master & Padavan App - Регистрация</v-toolbar-title>
                            </v-flex>
                        </v-layout>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
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
                                    <v-text-field label="Пароль" v-model="password" type="password" :rules="[passwordLength]" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-text-field label="Подтвердите пароль" v-model="confirmPassword" type="password"  :rules="[comparePasswords]"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-btn class="cyan white--text" large round @click.prevent="register" :disabled="!formIsValid">Регистрация</v-btn>
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
    export default {
        name: 'register',
        data () {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
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
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
                        console.log('Yeaaaah' + user.email);
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }
        }
    }
</script>


<style>

</style>