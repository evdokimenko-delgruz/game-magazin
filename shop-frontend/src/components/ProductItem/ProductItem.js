import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import {ArrowForward, Delete, Edit} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import imageNotAvailable from '../../assets/image-not-available.jpg';
import {apiUrl} from "../../config";
import {deleteProduct} from "../../store/actions/productsActions";

const ProductItem = ({ id, title, price, image }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    let cardImage = imageNotAvailable;
    if (image) {
         if (image.includes('images')) {
            cardImage = apiUrl + '/' + image;
        } else {
            cardImage = apiUrl + '/images/' + image;
        }
    }

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
            await dispatch(deleteProduct(id));
        }
    };

    return (
        <Grid item xs={12} sm={6} lg={3}>
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                '&:hover': {
                    boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease-in-out',
                }
            }}>
                <CardHeader
                    title={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>}
                    sx={{ paddingBottom: 0 }}
                />
                <CardMedia
                    title={title}
                    image={cardImage}
                    sx={{
                        paddingTop: '56.25%',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                    }}
                />
                <CardContent sx={{ padding: '16px', textAlign: 'center' }}>
                    <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                        Price: {price} руб.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
                    <IconButton
                        component={Link}
                        to={'/products/' + id}
                        variant="contained"
                        sx={{
                            color: 'primary.main',
                            '&:hover': {
                                color: 'primary.dark',
                            }
                        }}>
                        <ArrowForward />
                        Подробнее
                    </IconButton>
                    {user && user.role === 'admin' && (
                        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                            <Button
                                component={Link}
                                to={{
                                    pathname: '/edit/'+id,
                                }}
                                variant="contained"
                                color="info"
                                startIcon={<Edit />}
                                sx={{
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'info.dark',
                                    }
                                }}
                            >
                                Редактировать
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<Delete />}
                                onClick={handleDelete}
                                sx={{
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'error.dark',
                                    }
                                }}
                            >
                                Удалить
                            </Button>
                        </div>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
};

export default ProductItem;
