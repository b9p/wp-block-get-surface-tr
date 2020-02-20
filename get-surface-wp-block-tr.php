<?php
/*
Plugin Name: GET surface - TR Showcase
Description: Just a showcase how we use the Gutenberg Editor
Author: GET AG
Version: 1.0
Author URI: https://get-ag.com/
Text Domain: get-surface-wp-block-tr
License: GPL2+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
*/

//  Exit if accessed directly.
defined('ABSPATH') || exit;


class get_surface_wp_block_tr {
	
	static $version;
		
	// get plugin version from header
	static function get_plugin_version() {
		$plugin_data = get_file_data(__FILE__, array('version' => 'Version'), 'plugin');
		self::$version = $plugin_data['version'];
		return $plugin_data['version'];
	}
	
	// some things have to be loaded earlier
	static function plugins_loaded() {
		self::$version = self::get_plugin_version();
	}
	
	// is block-editor available
	static function if_gutenberg() {
		if (false === defined('GUTENBERG_VERSION') && false === version_compare(get_bloginfo('version'), '5.0', '>=')) {
			add_action('admin_notices', array(__CLASS__, 'notice_gutenberg_missing'));
			return false;
		}
	}
	
	// hook something
	static function init() {
		if (is_admin()) {
			if (false === self::if_gutenberg()) {
				return false;
			}
		}
		add_action('enqueue_block_editor_assets', array(__CLASS__, 'enqueue_block_editor_assets'));
	}
	
	
	static function enqueue_block_editor_assets() {
		wp_enqueue_script(
			'get-surface-wp-block-tr',
			plugins_url('/assets/js/editor.block.js', __FILE__),
			[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ],
			self::$version
		);
		wp_enqueue_style(
			'get-surface-wp-block-tr',
			plugins_url( '/assets/css/editor.block.css', __FILE__ ),
			[ 'wp-edit-blocks' ],
			self::$version
		);
	}
}

// Initialization
add_action('init', array('get_surface_wp_block_tr', 'init'));
add_action('plugins_loaded', array('get_surface_wp_block_tr', 'plugins_loaded'));
