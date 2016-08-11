var Movie = Backbone.Model.extend({

  defaults: {
    like: true,
  },
  initialize: function(title, year, rating) {
    this.set('title', title),
    this.set('year', year),
    this.set('rating', rating);
  },

  toggleLike: function() {
    if ( this.get( 'like' ) === true) {
      this.set('like', false);
    } else {
      this.set('like', true);
    }
    // your code here
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    this.on('change', function() {
      this.sort();
    }, this);
    // your code here
  
  },
  
  // comparator: function() {
  //   this.set('comparator');
  // },

  'comparator': 'title',

  sortByField: function(field) {
    this.comparator = field;
    this.sort();
    // this.set('comparator', field);
    console.log(field);
    console.log(this.comparator);
    // your code here
  },

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    this.model.on('change', this.render, this);
    // your code here
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    this.model.toggleLike();
    // your code here
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
