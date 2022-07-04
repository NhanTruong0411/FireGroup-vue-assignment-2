// HEADER
Vue.component('my-header', {
	// DATA
	data() {
		return {
			
		}
	},

	// PROPS
	props: {
		headingtitle: String,
	},


   // TEMPLATE
   template:
      `
			<div class="header">
				<div class="container">
					<h1 class="header__title">{{headingtitle}}</h1>
				</div>
			</div>
		`
});
