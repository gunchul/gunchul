
const POSE_DOWN = 0;
const POSE_UP = 1;
const POSE_START = 2;
const POSE_STOP = 3;
const POSE_COUNT_MAX = 100;

let pos_count = 0;
let pose_last_state = POSE_START; /* 0:DOWN, 1:UP, 2:START, 3:STOP */

function pose_next_state(down_value)
{
    switch(pose_last_state)
    {
        case POSE_DOWN:
            if (down_value < 0.5)
            {
                return POSE_UP;
            }
            return -1;
        case POSE_UP:
            if (down_value >= 0.8)
            {
                return POSE_DOWN;
            }
            return -1;
        case POSE_START:
            if (down_value >= 0.7)
            {
                return POSE_DOWN;
            }
            return -1;
        case POSE_STOP:
            return -1;
    }
}

/*
    STOP -> START
*/
function pose_state_do_at_down(state) {
    switch(state)
    {
        case POSE_DOWN:
            break;
        case POSE_UP:
            pos_count += 1;
            if (pos_count > POSE_COUNT_MAX)
            {
                pos_count = 0;
            }
            pose_last_state = state;
            break;
        case POSE_START:
            break;
        case POSE_STOP:
            pose_last_state = state;
            break;
    }
}

function pose_state_do_at_up(state) {
    switch(state)
    {
        case POSE_DOWN:
            pose_last_state = state;
            break;
        case POSE_UP:
            break;
        case POSE_START:
            break;
        case POSE_STOP:
            pose_last_state = state;
            break;
    }
}

function pose_state_do_at_start(state) {
    switch(state)
    {
        case POSE_DOWN:
            pose_last_state = state;
            pos_count = 0;
            break;
        case POSE_UP:
            break;
        case POSE_START:
            break;
        case POSE_STOP:
            break;
    }
}

function pose_state_do_at_stop(state) {
    switch(state)
    {
        case POSE_DOWN:
            break;
        case POSE_UP:
            break;
        case POSE_START:
            pose_last_state = state;
            break;
        case POSE_STOP:
            break;
    }
}

function pose_state(state) {
    var was = pose_last_state;
    if (-1 == state)
    {
        return false;
    }
    if (pose_last_state == state)
    {
        return was != pose_last_state;
    }
    switch(pose_last_state)
    {
        case POSE_DOWN:
            pose_state_do_at_down(state);
            break;
        case POSE_UP:
            pose_state_do_at_up(state);
            break;
        case POSE_START:
            pose_state_do_at_start(state);
            break;
        case POSE_STOP:
            pose_state_do_at_stop(state);
            break;
    }
    return was != pose_last_state;
}

function pose_init()
{
    pos_count = 0;
    pose_last_state = POSE_START;
}

function pose_state_get() {
    return pose_last_state;
}

function pose_count_get() {
    return pos_count;
}
