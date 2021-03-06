import {useState} from "react";
import {Divider,Card,CardHeader,CardMedia,CardContent,CardActions,Avatar,IconButton,Typography, makeStyles, TextField, Button, Box} from "@material-ui/core";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import "./Post.css";

const useStyles = makeStyles({
    root:{
      paper:{
        maxWidth:"1000px"
      }
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundSize:"contain"
    },
    card:{
      height:"45rem"
    }
})

function Post(props){
    const [numberOfLikes,setNumberOfLikes] = useState(0);
    const [isLiked,setIsLiked] = useState(false);

    const [commentArray,setCommentArray] = useState([]);
    const [comment,setComment] = useState("");
    
    const likeHandler = ()=>{
      if(isLiked === false){
        setNumberOfLikes(prevLike=>prevLike+1);
        setIsLiked(true);
      }else{
        setNumberOfLikes(prevLike=>prevLike-1);
        setIsLiked(false);
      }
    }

    const addCommentHandler=(e)=>{
      if(!comment) return;
      setCommentArray(prevArray=>{
          setComment(" ");
          return [...prevArray,comment];
      })
    }

    const classes = useStyles();
    const date = new Date(props.timestamp).toLocaleDateString();
    return(
    (props.location.pathname === "/profile") ?
    <Box style={{overflow:"hidden","display":"flex"}}>
       <Box style={{width:"60%"}}>
         <img alt="post media" src={props.media_url} style={{width:"100%",height:"100%"}}></img>
       </Box>
       <Card className={classes.card} style={{width:"50%"}}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} src={props.profilePicURL}>  
              </Avatar>
            }
            title={props.username}
          />
        {/* <CardMedia
          className={classes.media}
          image={props.media_url}
        /> */}
        <Divider style={{marginTop:".5rem",marginBottom:".5rem"}}/>
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p" noWrap={true} title={props.caption}>
            {props.caption}
          </Typography>
        </CardContent>
        <div style={{height:"50%",width:"100%",padding:"1rem",overflow:"hidden",overflowY: "scroll"}}>
            {
              commentArray.map(comment=>{
                return (
                  <Typography>
                  <span>
                    <Typography variant="p" style={{fontWeight:600}}>{props.username}: </Typography>
                    <span>{comment}</span>
                  </span>
                  </Typography>
                )
              })
            }  
          </div>
        <CardActions disableSpacing>
          <IconButton onClick={likeHandler}>
            {(isLiked) ? <FavoriteIcon style={{color:"red"}}/> : <FavoriteBorder />}
          </IconButton>
          <Typography>
            <span>{numberOfLikes} Likes</span>
          </Typography>
        </CardActions>
          <div style={{width:"100%",padding:"1rem",display:"flex",alignItems:"center"}}>
            <TextField value={comment} label="Add Comment" style={{width:"80%"}} onChange={(e)=>setComment(e.currentTarget.value)} />
            <Button variant="contained" color="primary" onClick={addCommentHandler}>Add</Button>
          </div>
        </Card>
    </Box>
     :
    <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} src={props.profilePicURL}>  
            </Avatar>
          }
          title={props.username}
          subheader={date}
        />
      <CardMedia
        className={classes.media}
        image={props.media_url}
       />
      <Divider style={{marginTop:".5rem",marginBottom:".5rem"}}/>
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p" noWrap={true} title={props.caption}>
          {props.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={likeHandler}>
          {(isLiked) ? <FavoriteIcon style={{color:"red"}}/> : <FavoriteBorder />}
        </IconButton>
        <Typography>
          <span>{numberOfLikes} Likes</span>
        </Typography>
       </CardActions>
       <div style={{height:"6rem",width:"100%",padding:"1rem",overflow:"hidden",overflowY: "scroll"}}>
          {
            commentArray.map(comment=>{
               return (
                 <Typography>
                 <span>
                   <Typography variant="p" style={{fontWeight:600}}>{props.username}: </Typography>
                   <span>{comment}</span>
                 </span>
                 </Typography>
               )
            })
          }  
        </div>
        <div style={{width:"100%",padding:"1rem",display:"flex",alignItems:"center"}}>
          <TextField value={comment} label="Add Comment" style={{width:"80%"}} onChange={(e)=>setComment(e.currentTarget.value)} />
          <Button variant="contained" color="primary" onClick={addCommentHandler}>Add</Button>
        </div>
    </Card>
    );
}

export default Post;