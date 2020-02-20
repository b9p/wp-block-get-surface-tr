/**
 * GET surface . Block - TR showcase
 *
 * https://github.com/b9p/wp-block-get-surface-tr
 *
 */

( function() {
	var __ = wp.i18n.__;
	var createElement = wp.element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var InspectorControls = wp.editor.InspectorControls;
	var ToggleControl = wp.components.ToggleControl; 	
	
	const blockIcon = createElement('svg', 
		{ 
			width: 24, 
			height: 24,
			viewBox: '0 0 24 24',
			className: 'b9p-icon'
		},
		createElement( 'path',
			{ 
				d: "M20.45 4.91L19.04 3.5l-1.79 1.8 1.41 1.41 1.79-1.8zM13 4h-2V1h2v3zm10 9h-3v-2h3v2zm-12 6.95v-3.96l-1-.58c-1.24-.72-2-2.04-2-3.46 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.42-.77 2.74-2 3.46l-1 .58v3.96h-2zm-2 2h6v-4.81c1.79-1.04 3-2.97 3-5.19 0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19v4.81zM4 13H1v-2h3v2zm2.76-7.71l-1.79-1.8L3.56 4.9l1.8 1.79 1.4-1.4z" 
			}
		)
	);
	
	/**
	 * Register block
	 *
	 * @param  {string}   name     Block name.
	 * @param  {Object}   settings Block settings.
	 * @return {WPBlock}          Block itself, if registered successfully,
	 *                             otherwise "undefined".
	 */
	registerBlockType(
		'getsurface/tr', 
		{
			title: 'GET surface - Tarifrechner',
			description: __( 'Tarifrechner zur Anzeige von Strom-Tarifen' ),
			icon: blockIcon,
			category: 'layout',
			
			attributes: {
				headline: {
					type: 'string',
					selector: 'h2',
					default: 'Headline goes here...',
				},
				subline: {
					type: 'string',
					default: 'Subline goes here...',
				},
				applyLayout: {
					type: 'boolean',
					default: false,
				},
			},
			
			edit: function( props ) {
				
				const {
					applyLayout,
				} = props;	
				
				const controls = [
					createElement(
						InspectorControls,
						{},
						createElement(
							ToggleControl,
							{
								label: __('Complex Layout'),								
								onChange: ( value ) => {
									props.setAttributes( { applyLayout: value } );
									onChangeLayoutSettings();
								},
								checked: props.attributes.applyLayout,
								
							}
						),
					),
				];			
				
				function onChangeLayoutSettings() {
					console.log(props.attributes.applyLayout);
				}
							
				return [controls,
					createElement(
						'div',
						{
							className: props.className + ' complex-layout-' + props.attributes.applyLayout,
						},
						blockIcon,
						createElement(
							'h1',
							null,
							'GET surface - Tarifrechner'
						),
						
						createElement(
							wp.editor.RichText , {
								className: props.className,
								value: props.attributes.headline,
								tagName: 'h2',
								formattingControls: [ 'italic' ],
								onChange: function( string ) {
									props.setAttributes( { headline: string } );
								}
							},
						),
						createElement(
							wp.editor.RichText , {
								className: props.className,
								value: props.attributes.subline,
								tagName: 'h3',
								formattingControls: [  ],
								onChange: function( string ) {
									props.setAttributes( { subline: string } );
								}
							},
						),
						createElement(
							'h4',
							{
								className: 'simple',
							},
							'Tarifrechner mit minimalen Eingaben zur schnellen Suche auf der Website'
						),
						createElement(
							'h4',
							{ 
								className: 'komplex',
							},
							'Tarifrechner mit komplexen Filtereinstellungen für detailierte Suchen über viele Produkte'
						),
					)
				];
				
			},

			save: function( props ) {
				
				return createElement( 
					'div',
					null,
						createElement(
							wp.editor.RichText.Content , {
								tagName: 'h2', 
								value: props.attributes.headline
							},
						),
						createElement(
							wp.editor.RichText.Content , {
								tagName: 'h3', 
								value: props.attributes.subline
							},
						),
				);
			},
		}
	);
})();