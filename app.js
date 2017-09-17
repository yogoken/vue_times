"use strict";

const NYTBaseUrl="https://api.nytimes.com/svc/topstories/v2/";
const ApiKey="aa1030639bd14935877fad15a36d1790";

const SECTIONS = "home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, world"

function buildUrl(url) {
    return NYTBaseUrl + url + ".json?api-key=" + ApiKey
}


Vue.component('news-list', {
  props: ['results'],
  template: `
    <section>
      <div class="row" v-for="posts in processedPosts">
        <div class="columns medium-3" v-for="post in posts">
          <div class="card">
            <div class="card-divider">
              {{ post.title }}
            </div>
            <a :href="post.url" target="_blank"><img :src="post.image_url"></a>
            <div class="card-section">
              <p>{{ post.abstract }}.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
    computed: {
        processedPosts() {
            let posts = this.results;
            // Add image_url attribute
            posts.map(post=>{
                let imgObj = post.multimedia.find(media=>media.format==="superJumbo");
            post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
        });
            // Put Array into Chunks
            let i, j, chunkedArray = [], chunk = 4;
            for (i=0, j=0; i < posts.length; i+=chunk, j++){
                chunkedArray[j] = posts.slice(i, i+chunk);
            }
            return chunkedArray;
        }
    }
});

const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        sections: SECTIONS.split(', '),
        section: 'home',
        loading: true,
        title: ''
    },
    mounted() {
        this.getPosts(this.section);
    },
    methods: {
        getPosts(section) {
            let url = buildUrl(section)
            axios.get(url).then((response) => {
                this.loading = false;
                this.results = response.data.results;
                let title = this.section !== 'home' ? "Top stories in '"+ this.section + "' today" : "Top stories today";
                this.title = title + "(" + response.data.num_results + ")";
            }).catch( error => { console.log(error); });
        }
    }
});