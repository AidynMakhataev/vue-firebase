<template>
    <v-container >
        <v-layout row>
            <v-flex xs12 sm3 offset-sm4 style="margin-top: 50px;">
                <v-card>
                    <v-toolbar class="teal" dark>
                        <v-layout row>
                            <v-flex xs12>
                                <v-toolbar-title>Войти в систему</v-toolbar-title>
                            </v-flex>
                        </v-layout>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
                            <form @keyup.enter="login">
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-text-field label="Email" v-model.trim="email" type="email" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-text-field label="Пароль" v-model.trim="password" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm8 offset-sm2>
                                    <v-btn class="teal white--text" large round @click.prevent="login"  :loading="isLoading" >Войти</v-btn>
                                </v-flex>
                            </v-layout>
                            <v-layout row v-if="alert">
                                <v-flex xs12  v-for="error in errors" :key="error.message">
                                    <v-alert error dismissible v-model="alert">{{ error }}</v-alert>
                                </v-flex>
                            </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                email: '',
                password: '',
                errors: [],
                alert: false,
                isLoading: false
            }
        },
        methods: {
            login () {
                this.errors = [];
                console.log('login')
                if(this.isFormValid()) {
                    this.isLoading = true;
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
                        this.$store.dispatch('setUser', user)
                        this.$router.push('/')
                    }).catch( error => {
                        this.errors.push(error.message)
                        this.alert = true
                        this.isLoading = false
                    })
                }
            },
            isFormValid() {
                if(this.email.length > 0 && this.password.length > 0) {
                    return true;
                }
                return false;
            }

        }
    }
</script>