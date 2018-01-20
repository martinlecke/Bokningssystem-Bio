const app = new App();
// Create an instance of the class
// let timeoutId;
// Wait for the web page to be ready
$(document).ready(function() {
	$('[data-toggle="popover"]').popover({
		container: 'body',
		html: true,
 		// delay: { "show": 0, "hide": 2000 },
 		placement: 'bottom',
 		trigger: 'hover',
 		content: function() {
 			return `
 			<p class="description">Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.
 			</p>
 			<a href="/filmer">Klicka här för att boka</a>`
 		}
 	});
});
// $('[data-toggle="popover"]').bind({
//     mouseover: function () {
//       clearInterval(timeoutId);
//       $('[data-toggle="popover"]').show();
//     },
//     mouseleave: function () {
//       timeoutId = setTimeout(function () {
//         $('[data-toggle="popover"]').hide();
//       }, 1000);
//     }
//   });