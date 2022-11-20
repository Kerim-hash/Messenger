import { makeStyles } from '@mui/styles';

export const useStylesMessages = makeStyles((theme) => ({
    outlinedInput: {
        borderRadius: '30px !important',
        fontWeight: '400 !important',
        margin: '10px 0',
        height: 45,
        marginBottom: '10px !important',
        background: theme.palette.secondary.light,
        "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
        },
    },
    messageForm: {
        position: 'relative',
        display:"flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #eee',
        padding: '0 8px',
    },
    messageWrapper: {
        display: 'inline-flex',
        flexDirection: 'column',
    },
    messageWrapperOwn: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: '5px',
    },
    message: {
        backgroundColor: 'rgb(29, 155, 240)',
        padding: '10px 14px',
        width: 'fit-content',
        borderRadius: '15px 15px 15px 0',
        color: '#fff',
        marginBottom: 2
    },
    messageOwn: {
        backgroundColor: 'rgb(29, 155, 240)',
        padding: '10px 14px',
        display: 'inline-block',
        borderRadius: '15px 15px 0 15px',
        color: '#fff',
    },
    messageDate: {
        color: '#536471',
    },
    userinfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },
}));