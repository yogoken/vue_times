const vm = new Vue({
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=aa1030639bd14935877fad15a36d1790")
    .then(response => {this.results = response.data.results})
  }
});
