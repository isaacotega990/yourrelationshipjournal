<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'mxouv418re3qxucg' );

/** Database username */
define( 'DB_USER', 'o8yiup6zfrhq4a36' );

/** Database password */
define( 'DB_PASSWORD', 'x7ezqxyi614stb8d' );

/** Database hostname */
define( 'DB_HOST', 'elementary-asparagus-xu82ytbncnbv4ierx3tdq0wm.herokudns.com' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'lh1twaybe0jifabsndcgiv9lgvcyn8fdldhceudgr9x63figjjtq98lcpqu0alz5' );
define( 'SECURE_AUTH_KEY',  'vbkodbzt2cgzfkylevekg4cbd3lz1dhsqff42zymsg24szxirqid8uwztdgihwr1' );
define( 'LOGGED_IN_KEY',    'qhyhoji4aw0k0cfzhqzn0p0huoqhq0irkftv6bdflqwxlucvqxaomls73bnzvgwh' );
define( 'NONCE_KEY',        'ofzsk7fda36ftbkesrllxmdrgkiy56jvx9hlaemo6v6zyf7nmmk0hwfjxwlf7mcb' );
define( 'AUTH_SALT',        'h9lpa3hapifpseo0nknthr3ga0uwqudqkdnkk5ed07vxplbl55od6gtx3zailmp8' );
define( 'SECURE_AUTH_SALT', 'gatcoj317kbcicqrgr1vhwn936xjvatym4tvawn8kguqke1ailywzpiu5kgqsivy' );
define( 'LOGGED_IN_SALT',   'oemonoty1van1oyp1vtslj05mtykeguqndavxra3tyyyacs2giyyd18udnjytw56' );
define( 'NONCE_SALT',       'juc1vwnmchuujuizxsjv1tevzjuf7p5lt2h9rls02tlptomxoppzmhz2bv6kcuii' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpxl_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
