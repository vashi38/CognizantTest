var app = angular.module('myApp',['ui.router']);
		app.controller('myCtrl', function($scope,$http){
			$scope.items=[1,2,3,4];
			$scope.checkbox_items=[
			{
				value:'Accepted',
				included:true
			},
			{
				value:'Skipped',
				included:true
			},
			{
				value:'Memory/Time Limit Exceeded',
				included:true
			},
			{
				value:'Runtime/compilation error',
				included:true
			},
			{
				value:'Wrong answer',
				included:true
			}];
			
			
			$scope.no={c:0,
				cpp:0,
				java:0,
				python:0};
			
			$http({
						method:"GET",
						url:"response/response.json"
					}).then(function(response){
						
					    $scope.items = response.data.websites;
						$scope.total_submissions=$scope.items.length;
						rep = response.data.websites;
						rep.map(calculate);
						$scope.myfun();
					});
			
			calculate = function(obj){
				
				if(obj.language.includes("C++"))
					$scope.no.cpp++;
				else if(obj.language.includes("Java"))
					$scope.no.java++;
				else if(obj.language.includes("Python"))
					$scope.no.python++;
				
			}
					
			$scope.myfun=function(){
				for(i=0;i<$scope.items.length;i++)
				{
					if($scope.items[i].compiler_status=='Accepted')
						$scope.items[i].selected=$scope.checkbox_items[0].included;
					else if($scope.items[i].compiler_status.includes("Wrong"))
						$scope.items[i].selected=$scope.checkbox_items[4].included;
					else if($scope.items[i].compiler_status.includes("exceeded"))
						$scope.items[i].selected=$scope.checkbox_items[2].included;
					else if($scope.items[i].compiler_status.includes("Skipped"))
						$scope.items[i].selected=$scope.checkbox_items[1].included;
					else if($scope.items[i].compiler_status.includes("error"))
						$scope.items[i].selected=$scope.checkbox_items[3].included;
						
				}
				
			}
		})	;