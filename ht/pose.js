
const POSE_STATE_DOWN = 0;
const POSE_STATE_UP = 1;
const POSE_STATE_START = 2;
const POSE_STATE_STOP = 3;

const POSE_TRIGGER_DOWN = 10;
const POSE_TRIGGER_UP = 11;
const POSE_TRIGGER_UNDEFINED = 12;
const POSE_TRIGGER_START = 13;
const POSE_TRIGGER_STOP = 14;

const POSE_COUNT_MAX = 100;

let pos_count = 0;
let pose_state = POSE_STATE_START;

function pose_trigger_get(down_value, up_value)
{
    switch(pose_state)
    {
        case POSE_STATE_DOWN:
            if (up_value >= 0.6)
            {
                return POSE_TRIGGER_UP;
            }
            break;
        case POSE_STATE_START:
        case POSE_STATE_UP:
            if (down_value >= 0.6)
            {
                return POSE_TRIGGER_DOWN;
            }
            break;
    }
    return POSE_TRIGGER_UNDEFINED;
}

/*
    STOP -> START
*/
function pose_state_do_at_down(trigger)
{
    switch(trigger)
    {
        case POSE_TRIGGER_UP:
            pos_count += 1;
            if (pos_count > POSE_COUNT_MAX)
            {
                pos_count = 0;
            }
            pose_state = POSE_STATE_UP;
            break;
    }
}

function pose_state_do_at_up(trigger)
{
    switch(trigger)
    {
        case POSE_TRIGGER_DOWN:
            pose_state = POSE_STATE_DOWN;
            break;
    }
}

function pose_state_do_at_start(trigger)
{
    switch(trigger)
    {
        case POSE_TRIGGER_DOWN:
            pose_state = POSE_STATE_DOWN;
            pos_count = 0;
            break;
    }
}

function pose_trigger(trigger)
{
    let was = pose_state;

    if (POSE_TRIGGER_UNDEFINED == trigger)
    {
        return false;
    }

    switch(trigger)
    {
        case POSE_TRIGGER_UNDEFINED:
            return false;
        case POSE_TRIGGER_STOP:
            pose_state = POSE_STATE_STOP;
            return true;
        case POSE_TRIGGER_START:
            pose_state = POSE_STATE_START;
            return true;
    }

    switch(pose_state)
    {
        case POSE_STATE_DOWN:
            pose_state_do_at_down(trigger);
            break;
        case POSE_STATE_UP:
            pose_state_do_at_up(trigger);
            break;
        case POSE_STATE_START:
            pose_state_do_at_start(trigger);
            break;
        case POSE_STATE_STOP:
            pose_state_do_at_stop(trigger);
            break;
    }

    if (pose_state == POSE_STATE_UP && pose_state != was)
    {
        return true;
    }
    return false;
}

function pose_init()
{
    pos_count = 0;
    pose_state = POSE_STATE_START;
}

function pose_state_get() {
    return pose_state;
}

function pose_count_get() {
    return pos_count;
}
