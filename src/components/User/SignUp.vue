<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3 v-if = "error">
				<app-alert @dismissed = "onDismissed" :text = "error.message"></app-alert>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<h2 class="headline font-weight-medium teal--text mb-3 text-xs-center">Sign Up in DevMeetups</h2>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card dark>
					<v-card-text>
						<v-container>
							<form @submit.prevent = "onSignup">
								<v-layout row >
									<v-flex xs12>
										<v-text-field
											name = "fname"
											color = "teal"
								            label="First name"
								            id = "fname"
								            required
								            v-model = "fname"
								            type = "text"
								        ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row >
									<v-flex xs12>
										<v-text-field
											name = "lname"
											color = "teal"
								            label="Last name"
								            id = "lname"
								            required
								            v-model = "lname"
								            type = "text"
								        ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row >
									<v-flex xs12>
										<v-text-field
											name = "imagep"
											color = "teal"
								            label="Paste the URL of your profile photo"
								            id = "imagep"
								            required
								            v-model = "imagep"
								            type = "text"
								        ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<img :src="imagep" style="width: 100%">
									</v-flex>
								</v-layout>
								<v-divider dark class = "mb-3 mt-5"></v-divider>
								<v-layout row >
									<v-flex xs12>
										<v-text-field
											name = "email"
											color = "teal"
								            label="Email"
								            id = "email"
								            required
								            v-model = "email"
								            type = "email"
								        ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row >
									<v-flex xs12>
										<v-text-field
											name = "password"
											color = "teal"
								            label="Password"
								            id = "password"
								            required
								            v-model = "password"
								            type = "password"
								        ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row >
									<v-flex xs12>
										<v-text-field
											name = "confirmPassword"
											color = "teal"
								            label="Confirm Password"
								            id = "confirmPassword"
								            required
								            v-model = "confirmPassword"
								            type = "password"
								            :rules = "[comparePassword]"
								        ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12 class = "text-xs-center">
										<v-btn type="submit" :loading="loading" class = "white--text teal darken-3">
					                      	Sign up
					                       	<span slot="loader" class="custom-loader">
					                        	<v-icon light>cached</v-icon>
					                       	</span>
					                    </v-btn>
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
		data () {
			return {
				email : '',
				password : '',
				confirmPassword : '',
				fname : '',
				lname : '',
	          	imagep : ''
			}
		},
		methods : {
			onSignup(){
				console.log(this.email +' '+ this.password +' '+ this.confirmPassword)
				const userData = {
					email : this.email,
					password : this.password,
					fname : this.fname,
					lname : this.lname,
					imagep : this.imagep,
				}
				this.$store.dispatch('signUserUp',userData)
			},
			onDismissed (){
				console.log('dismissed alert')
				this.$store.dispatch('clearError')
			}
		},
		computed : {
			comparePassword() {
				return this.password != this.confirmPassword ? 'password does not match' : true
			},
			user (){
				return this.$store.getters.user
			},
			error (){
				return this.$store.getters.error
			},
			loading () {
				return this.$store.getters.loading
			}
		},
		watch : {
			user (value) {
				if (value != null && value != undefined){
					this.$router.push('/')
				}
			}
		}
	}
</script>
<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>