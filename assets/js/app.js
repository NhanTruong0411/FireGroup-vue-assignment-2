// NEW VUE
new Vue({
	el: "#app",

	// DATA
	data() {
		return {
			productlist: [],
			temp_array: [],
			paginationproduct: [],
			selected_product_list: [],
			current_page: 1,
			records_per_page: 10,
			isSort: false,
			search_input: "",
		};
	},


	// METHODS
	methods: {
		prev_page: function () {
			if (this.current_page > 1) {
				this.current_page--;
				this.change_page(this.current_page);
			}
		},

		next_page: function () {
			if (this.current_page < this.num_pages()) {
				this.current_page++;
				this.change_page(this.current_page);
			}
		},

		num_pages: function () {
			return Math.ceil(this.temp_array.length / this.records_per_page);
		},

		change_page: function (page) {
			if (page < 1) page = 1;
			if (page > this.num_pages()) page = this.num_pages();

			this.paginationproduct = [];

			for (let i = (page - 1) * this.records_per_page; i < (page * this.records_per_page); i++) {
				if(this.temp_array[i] == undefined) {
					break;
				} else {
					this.paginationproduct.push(this.temp_array[i]);
				}
			}
		},

		first_page: function () {
			if (this.current_page == 1) {
				for (let i = 0; i < this.records_per_page; i++) {
					this.paginationproduct.push(this.temp_array[i]);
				}
			}
			return this.paginationproduct;
		},

		sort_product_list: function () {
			let sortbtn = document.querySelector("#sortbtn");
			if (!this.isSort) {
				this.isSort = true;
				sortbtn.innerHTML = "Product title Z - A";
				this.temp_array = [];
				this.temp_array = [...this.productlist];
				this.temp_array = this.temp_array.sort(this.doSort);
				this.update_product_list(this.temp_array);
			}
			else {
				this.isSort = false;
				sortbtn.innerHTML = "Product title A - Z";
				this.temp_array = [];
				this.temp_array = [...this.productlist];
				this.temp_array = this.temp_array.sort(this.doSort).reverse();
				this.update_product_list(this.temp_array);
			}
		},

		doSort: function (a, b) {
			if (a.name.toLowerCase() < b.name.toLowerCase()) {
				return -1;
			}
			if (a.name.toLowerCase() > b.name.toLowerCase()) {
				return 1;
			}
			return 0;
		},

		update_product_list: function (arr) {
				this.paginationproduct = [];
				for (let i = (this.current_page - 1) * this.records_per_page; i < (this.current_page * this.records_per_page); i++) {
					if(arr[i]) {
						this.paginationproduct.push(arr[i]);
					}
					else {
						break;
					}
				}
			
		},

		do_filter: function () {
			let searchString = this.search_input.toLowerCase();

			if(searchString == "") {
				this.current_page = 1;
				this.temp_array = [];
				this.temp_array = [...this.productlist]
				this.update_product_list(this.temp_array);
			} else {
				this.temp_array = [];
				this.temp_array = [...this.productlist];
	
				let name = function (el) {
					return el.name.trim().toLowerCase().includes(searchString);
				};
	
				this.temp_array = this.temp_array.filter(name);
				if(this.temp_array) {
					this.update_product_list(this.temp_array)
				} else {
					this.temp_array = [];
					this.update_product_list(this.temp_array);

				}
			}

		},

		is_empty_obj: function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return false;
			}
			return true;
		},

		passing_selected_list(value) {
			this.selected_product_list = [];
			value.forEach(el => {
				this.selected_product_list.push(el);
			})
		}

	},


	// COMPUTED
	computed: {
	},

	// WATCHER
	watch: {
		search_input() {
			this.do_filter();
		},

		temp_array() {
         if(this.temp_array.length == 0) {
            this.paginationproduct = [];
         } else {
				this.update_product_list(this.temp_array)
			}
      },
	},

	// CREATED 
	created: async function () {
		const response = await fetch("http://127.0.0.1:5500/product.json");
		//const response = await fetch("https://github.com/NhanTruong0411/FireGroup-vue-assignment-2/blob/master/product.json");
		const data = await response.json();
		this.productlist = data;
		this.temp_array = [...this.productlist];
		this.first_page();
	},

	//  MOUNTED
	mounted: function () {
	}





});
