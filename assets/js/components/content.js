
// CONTENT
Vue.component('my-content', {



   // template
   template:
      `
			<div class="content">
				<div class="container">

					<div class="content__action">
						<div class="content__action-search">
							<input type="text" placeholder="Search product by name, tag, id..." :value="value" v-on:input="update_value($event.target.value)">
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M13.8906 13.5742L10.582 10.2656C10.5 10.2109 10.418 10.1562 10.3359 10.1562H9.98047C10.8281 9.17188 11.375 7.85938 11.375 6.4375C11.375 3.32031 8.80469 0.75 5.6875 0.75C2.54297 0.75 0 3.32031 0 6.4375C0 9.58203 2.54297 12.125 5.6875 12.125C7.10938 12.125 8.39453 11.6055 9.40625 10.7578V11.1133C9.40625 11.1953 9.43359 11.2773 9.48828 11.3594L12.7969 14.668C12.9336 14.8047 13.1523 14.8047 13.2617 14.668L13.8906 14.0391C14.0273 13.9297 14.0273 13.7109 13.8906 13.5742ZM5.6875 10.8125C3.25391 10.8125 1.3125 8.87109 1.3125 6.4375C1.3125 4.03125 3.25391 2.0625 5.6875 2.0625C8.09375 2.0625 10.0625 4.03125 10.0625 6.4375C10.0625 8.87109 8.09375 10.8125 5.6875 10.8125Z" fill="#8F90A6"/>
							</svg>
						</div>	
						<div class="content__action-sort">
							<button class="button" @click="sort_product_list()">
								<small>Sort :</small>
								<h3 id="sortbtn">Product title A - Z</h3>
                        <img src="./assets/images/sort.png" />
							</button>
						</div>								
					</div>


               <div class="content__select-all">
                  <div class="content__select-all--checkbox">
                     <input id="check_all" type="checkbox" v-model="check_all">
                     <h3 v-if="!is_empty_obj(selected)">{{selected.length}} Products selected</h3>
                     <h3 v-else>Product</h3>
                  </div>
                  <div class="content__select-all--price">
                     <h3>Price</h3>
                  </div>
               </div>

               <div class="content__products">
                  <div class="content__product" v-for="product in paginationproduct" :key="product.id" :class="is_empty_obj(paginationproduct)?none_display:''" >
                     <div class="content__product--checkbox">
                        <input type="checkbox" v-model="selected" :value="product.id">
                     </div>
                     <div class="content__product--info">
                        <img :src="product.image" />
                        <div class="content__product--info-content">
                           <h4>{{product.name}}</h4>
                           <small>2068157595717</small>
                        </div>
                     </div>
                     <div class="content__product--price">
                        <h4>$ {{product.price}}</h4>
                     </div>
                     <div class="content__product--hr"></div>
                  </div>
                  <h5 :class="!is_empty_obj(paginationproduct)?none_display:''">Không tồn tại sản phẩm</h5>
               </div>

				</div>
			</div>
		`,


   // data
   data() {
      return {
         current_page: 1,
         products_per_page: 10,
         none_display: 'none_display',
         check_all : false,
         selected: [],

      };
   },


   // props
   props: [
      'paginationproduct', 
      'sort_product_list', 
      'do_filter', 
      'search_input', 
      'value', 
      'is_empty_obj',
      'temp_array',
   ],


   // medthods
   methods: {
      update_value: function (value) {
         this.$emit('input', value);
      }
   },


   // computed
   computed: {
   },

   // created
   created: function () {
      let local = localStorage.getItem("product_store") ? localStorage.getItem("product_store") : '[]';
      local = JSON.parse(local);
      this.selected = [...local];

   },

   // watch
   watch: {
      check_all() {
         if(this.check_all) {
            if(this.temp_array) {
               let selected = [];
               this.temp_array.forEach(function (product) {
                  selected.push(product.id);
               });
               this.selected = selected;
            }
         } else {
            this.selected = []
         }
      },

      selected() {
         this.$emit("selected_list", this.selected);
         
      },



   }




});