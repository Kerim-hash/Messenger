import { makeStyles } from '@mui/styles';

export const useStylesAside = makeStyles((theme) => ({
    search: {
        background: "#EFF3F4",
        padding: '10px',
        borderRadius: '20px'
    },
    listUsers: {
        background: theme.palette.secondary.dark,
        padding: '8px 0',
        borderRadius: 10,
        boxShadow: 'rgb(149 157 171 / 30%) 0px -4px 9px',
        position: 'absolute',
        width: '100%',
        left: 0,
        zIndex: 99,
    },
    listUsersFooter: {
        background: theme.palette.secondary.light,
        borderRadius: 10,
        marginTop: '20px',
        boxShadow: 'none',
        padding: '8px 0',
    },
    user: {
        display: 'flex',
        color: 'inherit',
        textDecoration: 'none',
        alignItems: 'center',
        paddingBottom: '15px',
        padding: '15px 10px 0 10px',
        backdropFilter: 'blur(75px)',
        background:'rgb(5 115 255 / 29%)',
        borderRadius: 20,
        cursor: 'pointer',
        margin: '5px',
        "&:hover": { background: theme.palette.tonalOffset },
    },
    item: {
        display: 'flex',
        alignItems: 'align-start',
    },
    userinfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,

    },
    disabled: {
        background: "#eee",
        pointerEvents: 'none',
    }

}));
