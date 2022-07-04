// FOOTER
Vue.component('my-footer', {
   // template
   template:
      `
         <div class="footer">
            <div class="container">
            
               <div class="footer__pagination">
                  <button class="button" id="btn_prev" @click="prev_page()" :class="is_prev_disabled?button_hidden:''">
                     <img src="./assets/images/previous.png">
                     <small>Prev</small>
                  </button>
                  <button class="button" id="btn_next" @click="next_page()" :class="is_next_disabled?button_hidden:''" >
                     <small>Next</small>
                     <img src="./assets/images/next.png">
                  </button>
               </div>

               <div class="footer__action">
                  <button class="button button-cancel" @click="reset_page()">
                     <small>Cancel</small>
                  </button>
                  <button class="button button-save" @click="save_product()">
                     <small>Save</small>
                  </button>
               </div>

            </div>
         </div>
      `,


   // data
   data() {
		return {
         button_hidden: 'button_hidden',
		}
   },

   // props
   props: {
      prev_page : { type: Function },
      next_page : { type: Function },
      is_prev_disabled: { type: Boolean },
      is_next_disabled: { type: Boolean },
      selected_product_list: { type: Array },
   },

   // medthods
   methods: {
      save_product() {
         let product_store = localStorage.getItem("product_store") ? localStorage.getItem("product_store") : '[]';
         product_store = JSON.parse(product_store);
         product_store = [...this.selected_product_list];
         localStorage.setItem('product_store', JSON.stringify(product_store))
      },

      reset_page(){
         localStorage.clear();
         location.reload();
      }
   },

   // computed
   computed: {

   },

   // Created
   created: function() {
   },

   // Watch
   watch: {
   }

});
