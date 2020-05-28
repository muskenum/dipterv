module.exports = {
    WORLD_MIN: 0,
    WORLD_MAX: 800,
    WORLD_PADDING: 30,

    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 800,
    DRAWING_NAME_FONT: '14px Helvetica',
    DRAWING_NAME_COLOR: 'black',
    DRAWING_HP_COLOR: 'green',
    DRAWING_HP_MISSING_COLOR: 'red',
    DRAWING_IMG_BASE_PATH: '/client/img',
    DRAWING_IMG_KEYS: ['self_tank', 'self_turret', 'other_tank', 'other_turret', 'shell', 'tile'],
    DRAWING_TILE_SIZE: 100,

    VIEWPORT_STICKINESS: 0.004,

    PLAYER_TURN_RATE: 0.005,
    PLAYER_DEFAULT_SPEED: 0.4,
    PLAYER_SHOT_COOLDOWN: 800,
    PLAYER_DEFAULT_HITBOX_SIZE: 20,
    PLAYER_MAX_HEALTH: 10,

    SHELL_DEFAULT_DAMAGE: 1,
    SHELL_SPEED: 1.2,
    SHELL_HITBOX_SIZE: 10
};