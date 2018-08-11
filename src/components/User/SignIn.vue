<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3 v-if = "error">
				<app-alert @dismissed = "onDismissed" :text = "error.message"></app-alert>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<h2 class="headline font-weight-medium teal--text mb-3 text-xs-center">Sign In</h2>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card dark>
					<v-card-text>
						<v-container>
							<form @submit.prevent = "onSignin">
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
								<v-layout row>
									<v-flex xs12 class = "text-xs-center">
										<v-btn type="submit" :loading="loading" class = "white--text teal darken-3">
					                      	Sign in
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
			}
		},
		methods : {
			onSignin(){
				console.log(this.email +' '+ this.password)
				const userData = {
					email : this.email,
					password : this.password
				}
				this.$store.dispatch('signUserIn',userData)
			},
			onDismissed (){
				console.log('dismissed alert')
				this.$store.dispatch('clearError')
			}
		},
		computed : {
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