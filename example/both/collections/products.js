//First of all create Mongo collections
products = new Mongo.Collection('products');
// Attach schema for autoForm
products.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 40
  },
  description: {
    type: String,
    label: "Description",
    max: 160
  },
  description: {
    type: Number,
    label: "Price",
    max: 160
  },
  content: {
    type: String,
    label: "Content",
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
        settings: {
          height: 200
        }
      }
    },
    optional: true
  },
  picture: {
    type: String,
    label: 'Picture',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        accept: 'image/*',
        label: 'Choose a piture',
        previewTemplate: 'filePreview',
        //selectFileBtnTemplate: 'fileButtonSelect',
        //removeFileBtnTemplate: 'fileButtonRemove',
        onBeforeInsert: function(fileObj) {

        },
        onAfterInsert: function(err, fileObj) {
        }
      }
    },
    optional: true
  },
  category: {
    type: String,
    label: "Category",
    type: "select2",
    autoform: {
      options: function () {
        return productcategories.find().map(function (p) {
            if (!_.isUndefined(p.description))
              description = p.description;
            else
              description = '';

            return {label: p.title+' '+description, value: p._id};
        });
      }
    }
  },
  // hide createdBy column
  createdBy: {
    type: String,
    autoform: {
        type: "hidden",
        label: false
    },
    autoValue: function () { 
      return this.userId;
    },
    optional: true
  },
  createdAt: {
    type: Number,
    autoform: {
        type: "hidden",
        label: false
    },
    autoValue: function () { 
      return new Date().getTime();
    }
  }
}));
// Define rules for autoCms
products.autoCms = {
  wrapper: {
    type: 'table',
    class: 'table table-hover'
  },
  title: 'Products',
  message: {
    list: 'Default message which will be at the very top. You can use html tags <a href="http://github.com/guncebektas">click here</a>',
    success: 'Success: Everything is completed.',
    error: 'Error: Something went wrong, please try again.',
  },
  buttons: {
    extra: {
      label: '<i class="fa fa-eye" alt="Show"></i> Show',
      class: 'btn btn-xs btn-success',
      auth: function() {    // default true
        return true; 
      },
      href: function(data) {
        return location.origin+'/product/'+data;
      }
    },
    edit: {
      label: '<i class="fa fa-pencil-square-o" alt="Edit"></i> Edit',
      class: 'btn btn-xs btn-default',
      auth: function() {    // default false
        return true; 
      }
    },  
    delete: {
      label: '<i class="fa fa-trash" alt="Delete"></i> Delete',
      class: 'btn btn-xs btn-danger',
      auth: function() {    // default false
        return true; 
      }
    },
    showNavButtons: true,    // default true
    navButtonInsert: {
      label: '<i class="fa fa-plus"></i>',
      class: 'btn btn-default'
    },
    navButtonList: {
      label: '<i class="fa fa-list"></i>',
      class: 'btn btn-default'
    },
    showActionButtons: true  // default true
  },
  showNo: true,  // default true
  columns: {
    picture: {
      type: 'image',
      width: 60
    },
    title: {

    },
    description: {

    },
    price: {
      edit: true
    }
  }
}

if (Meteor.isServer) {
  products.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}