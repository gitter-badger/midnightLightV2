///<reference path="../../../ts-typings/tsd.d.ts" />
///<reference path="../../../ts-typings/typescriptApp.d.ts" />

module MidnightLight {
	'use strict';

	class PostsController {
		static $inject = ['$scope', 'MidnightLight.PostsService'];

		private posts : Array<Post> = new Array<Post>();

		constructor(private $scope : ng.IScope, private postsService : PostsService) {
			this.postsService.getPosts().success((rawData) => {
				var rawPosts : any[] = rawData;

				for (var i = 0 ; i < rawPosts.length ; i++) {
					var obj = rawPosts[i];

					var post: Post = new Post();
					post.title = obj.title;
					post.author = obj.author.nickname;
					post.authorUrl = obj.author.URL;
					post.content = obj.content;
					this.posts.push(post);
				}
			});
		}
	}

	angular.module('MidnightLight')
		.controller('MidnightLight.PostsController', PostsController);

}