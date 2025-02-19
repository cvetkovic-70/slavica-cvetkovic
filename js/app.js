const markdown = markdownit({
  html: true,
  linkify: true,
  typographer: false
}).use(window.markdownitContainer, 'panel');

let count = 0;
markdown.renderer.rules.heading_open = function(tokens, idx) {
  const level = tokens[idx].tag;
  return `<${level} id="content-${count++}">`;
};

const app = Vue.createApp({
	data() { 
		return {
		    isLoading: 0,
			html: '',
			navigation: [],
			date: new Date().getFullYear(),
		}
	},
	created() {
		this.$root.showLoader();
	
		axios.get('/md/page.md')
		.then((response) => {
			this.$root.hideLoader();
			this.generateNavigation(response.data);
			this.html = markdown.render(response.data);
			this.html = this.postRender(this.html);
			setTimeout(reveal, 1000);
		})
		.catch((error) => {
			this.$root.hideLoader();
		});

	},
	mounted() {
		var elems = document.querySelectorAll('.sidenav');
		var instances = M.Sidenav.init(elems, {});
		
		window.addEventListener("scroll", reveal, {passive: true});
	},
	methods: {
	    showLoader() {
	    	this.isLoading += 1;
	    },
	   	hideLoader() {
	    	if(this.isLoading > 0) {
	    		this.isLoading -= 1;
	    	}
	    },
		postRender(html) {
			return html.replaceAll(/%%%\s([\w\s]*)\s%%%/g, '<i class="small material-icons x-icon">$1</i>');
		},
		generateNavigation(markdown) {
			let regex = /#{1,2}(.+)/g
			let matches;
			let i = 0;
			while(matches = regex.exec(markdown)) {
				this.navigation[i++] = matches[1].trim();
			}
		},
		closeSideNav() {
			var elems = document.querySelectorAll('.sidenav');
			if(elems[0] !== "undefined") {
				var instance = M.Sidenav.getInstance(elems[0]);
				if(typeof instance != "undefined") {
					instance.close();
				}
			}
		},
	},	
});

app.mount('#app');