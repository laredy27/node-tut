$(function(){
	$('form').submit(function(e){
		//e.preventDefault();
		console.log('submit prevented');
		var item = $('form input');
		var todo = {item: item.val()}

		$.ajax({
			type: 'POST',
			url: "/todo",
			data: todo,
			success: function(data){
				//console.log(data);
				location.reload();
			}
		});
	});

	$('.list-group-item-action').click(function(){
		var item = $(this).text().replace(/ /g, "-");

		$.ajax({
			type: "DELETE",
			url: "/todo/" + item,
			success: function(data){
				//console.log(data);
				location.reload();
			}
		});
	});
});