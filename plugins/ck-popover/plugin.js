// Register the plugin within the editor.
CKEDITOR.plugins.add( 'ck-popover', {

	// Register the icons.
	icons: 'popup',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define an editor command that opens our dialog window.
		editor.addCommand( 'popup', new CKEDITOR.dialogCommand( 'popupDialog' ) );

		// Create a toolbar button that executes the above command.
		editor.ui.addButton( 'ck-popover', {

			// The text part of the button (if available) and the tooltip.
			label: 'Insert Popup',

			// The command to execute on click.
			command: 'popup',

			// The button placement in the toolbar (toolbar group name).
			toolbar: 'insert',
			
			// Button icon
			icon: this.path + 'icons/popup.png',
		});

		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'popupDialog', this.path + 'dialogs/ck-popover.js' );
		
		if ( editor.contextMenu ) {
			console.log("CONTEXT MENU ENABLED");
			
			editor.addMenuGroup( 'popupGroup' );
			editor.addMenuItem( 'popupItem', {
				label: 'Edit Popup',
				icon: this.path + 'icons/popup.png',
				command: 'popup',
				group: 'popupGroup'
			});
		}
		
		editor.contextMenu.addListener( function( element ) {
			if ( element.getAscendant( 'a', true ) ) {
				 return { popupItem: CKEDITOR.TRISTATE_OFF };
			 }
		});
	}
});