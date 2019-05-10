
// Our dialog definition.
CKEDITOR.dialog.add( 'popupDialog', function( editor ) {
	return {

		// Basic properties of the dialog window: title, minimum size.
		title: 'Popup Properties',
		minWidth: 100,
		minHeight: 100,

		// Dialog window content definition.
		contents: [
			{
				// Definition of the Basic Settings dialog tab (page).
				id: 'tab-basic',
				label: 'Basic Settings',

				// The tab content.
				elements: [
					{
						// Title text.
						type: 'text',
						id: 'title',
						label: 'Popup title',
						setup: function( element ) {
							this.setValue( element.getAttribute( "title" ) );
						},
						commit: function( element ) {
							element.setAttribute( "title", this.getValue() );
						},
					},
					{
						// Content text.
						type: 'text',
						id: 'content',
						label: 'Popup content',
						setup: function( element ) {
							this.setValue( element.getAttribute( "data-content" ) );
						},
						commit: function( element ) {
							element.setAttribute( "data-content", this.getValue() );
						},
					},
					{
						// Placement.
						type: 'radio',
						id: 'placement',
						label: 'Popup placement',
						items: [[ 'Top', 'top' ], [ 'Right', 'right' ], [ 'Bottom', 'bottom' ], [ 'Left', 'left' ]],
						default: 'bottom',
						setup: function( element ) {
							if ( element.getAttribute( "data-placement").startsWith('auto') ){
								var res = element.getAttribute( "data-placement").split(' ')[1];
								this.setValue( res );
							}
							else
								this.setValue( element.getAttribute( "data-placement") );
						},
					},
					{
						// Auto Placement.
						type: 'checkbox',
						id: 'placement-auto',
						label: 'Auto popup placement (For Bootstrap 3)',

						setup: function( element ) {
							if ( element.getAttribute( "data-placement").startsWith('auto') )
								this.setValue( true );
							else
								this.setValue( false );
						},
					},
					{
						// Trigger.
						type: 'radio',
						id: 'trigger',
						label: 'Popup trigger',
						items: [[ 'None', 'none' ], [ 'Hover', 'hover' ]],
						default: 'none',
						// TODO FIX: `focus` mode not working.
						// items: [[ 'None', 'none' ], [ 'Focus', 'focus' ], [ 'Hover', 'hover' ]],
						setup: function( element ) {							
							if ( element.getAttribute( "data-trigger" ) != null ){
								this.setValue( element.getAttribute( "data-trigger" ) );
							}
							else{
								this.setValue('none');
							}
						},
						commit: function( element ) {
							if(this.getValue() == 'none'){
								if(element.getAttribute('data-trigger')){
									element.removeAttribute('data-trigger');
								}
							}
							else{
								element.setAttribute('data-trigger', this.getValue());
							}
						},
					},
					{
						// HTML.
						type: 'checkbox',
						id: 'html-content',
						label: 'Enable HTML code inside popup',
						setup: function( element ) {
							if ( element.getAttribute( "data-html" ) )
								this.setValue( true );
							else
								this.setValue( false );
						},
						commit: function( element ) {							
							if(this.getValue()){
								element.setAttribute( 'data-html', 'true' );}
							else{
								element.removeAttribute( 'data-html' );
							}
						},
					},
				]
			},
		],

		onOk: function() {

			var dialog = this,
				span = dialog.element;

			dialog.commitContent( span );
			
			// Popup placement
			var placement_choice = dialog.getValueOf( 'tab-basic', 'placement');
			var auto_placement = dialog.getValueOf( 'tab-basic', 'placement-auto');
			if(auto_placement){
				placement_choice = "auto "+placement_choice;}
			span.setAttribute( 'data-placement', placement_choice );
			
			if ( !dialog.editMode ){
				span.setText( editor.getSelection().getNative() );
				editor.insertElement( span );
			}
		},
		
		onShow: function() {

			// Capture the text selected in the editor
			var selection = editor.getSelection();
			
			// Make an element node from that selection
			var element = selection.getStartElement();

			// If an element exists
			if ( element )
				/* Get the closest `a` tag to that element (true indicates self-inclusion
					in the search) and save it again in the `element` variable */
				element = element.getAscendant( 'a', true );

			// If no `a` tag found or _______
			if ( !element || element.getName() != 'a' ) {
				// Create new `a` tag
				element = editor.document.createElement( 'a' );
				
				// Set fixed element attributes.
				element.setAttribute( 'class', 'popup-text' );
				element.setAttribute( 'data-toggle', 'popover' );
				
				this.editMode = false;
			}
			// `a` tag found. Prepare for editing it.
			else{
				this.editMode = true;
			}
			
			// dialog.element = element
			this.element = element;
			
			if ( this.editMode ){
				// Run the functions in `setup` attribute of the dialog's elements
				this.setupContent( element );
			}
		}
	};
}); 