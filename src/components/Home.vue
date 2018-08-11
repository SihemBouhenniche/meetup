<template>
	<v-container>
		<v-layout row wrap >
			<v-flex xs12 sm6 class = "text-xs-center text-sm-right">
				<v-btn large router dark to = "/meetup/meetups" class = "pink lighten-2">Explore Meetups</v-btn>
			</v-flex>
			<v-flex xs12 sm6 class = "text-xs-center text-sm-left">
				<v-btn large router dark to = "/meetup/createmeetup" class = "pink lighten-2">Organize New Meetup</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row wrap class = "mt-3">
			<v-flex xs12 class = "text-xs-center">
				<v-progress-circular :size="70" :width="7" color="teal" indeterminate v-if="loading"></v-progress-circular>
			</v-flex>
		</v-layout>
		<v-layout row wrap class = "mt-3" v-if="!loading">
			<v-flex xs12>
				<v-carousel >
				    <v-carousel-item
				      v-for="item in meetups"
				      :key="item.id"
				      :src="item.src"
				      :to = "/meetup/+item.id"
				    >
				    	<div class="titleImage">{{item.title}}</div>
				    </v-carousel-item>
				</v-carousel>
			</v-flex>
		</v-layout>
		<v-layout row wrap class = "mt-3">
			<v-flex xs12 class = "text-xs-center">
				<p class="display-1 font-weight-light font-italic">Join our awsome meetups!!</p>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
export default {
  computed : {
  	meetups () {
  		return this.$store.getters.featuredMeetups
  	},
  	loading () {
		return this.$store.getters.loading
	}
  },
   methods: {
  	onLoadMeetup : function (id) {
  		// body...
  		this.$router.push('/meetup/' + id);
  	}
  },
}
</script>
<style scoped>
	.titleImage{
		text-align: center;
		font-size: 2em;
		color: #fff;
		padding: 10px;
		background-color: rgba(0,0,0,.5);
	}
</style>