import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutUser } from "../../../../store/actions/usersActions";
import { historyReplace } from '../../../../store/actions/historyActions';

const UserMenu = ({ user }) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: '#FFD700', // Золотой цвет текста
                    textShadow: '0px 0px 8px #FF4500', // Свечение текста
                    fontWeight: 'bold', // Жирный текст
                    '&:hover': {
                        color: '#FF4500', // Оранжево-красный цвет при наведении
                        textShadow: '0px 0px 10px #FF4500', // Усиленное свечение при наведении
                    },
                }}
            >
                {
                    user.avatar &&
                    <Avatar
                        alt={user.displayName}
                        src={user.avatar}
                        sx={{ width: 24, height: 24, marginRight: "5px", border: '2px solid #FFD700' }} // Золотая окантовка аватара
                    />
                }
                Привет, {user.displayName}!
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        dispatch(historyReplace('/profile'));
                    }}
                >
                    Профиль
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        dispatch(logoutUser());
                    }}
                >
                    Выйти
                </MenuItem>
            </Menu>

        </div>
    );
};

export default UserMenu;
