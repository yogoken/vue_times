const NYTBaseUrl="https://api.nytimes.com/svc/topstories/v2/";
const ApiKey="aa1030639bd14935877fad15a36d1790";

function buildUrl(url) {
    return NYTBaseUrl + url + ".json?api-key=" + ApiKey
}

const vm = new Vue({
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    this.getPosts('home');
  },
  methods: {
    getPosts(section) {
      let url = buildUrl(section)
      axios.get(url).then((response) => {
        this.results = response.data.results;
      }).catch( error => { console.log(error); });
    }
  }
});
