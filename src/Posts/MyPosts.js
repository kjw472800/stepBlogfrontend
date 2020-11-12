import { Grid,Backdrop,CircularProgress,Button, Divider } from '@material-ui/core';
import React,{useEffect,useState,useContext} from 'react';
import MyPostItem from './MyPostItem';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/Context/auth-context';
import { useHistory } from 'react-router-dom';
import testImage from '../testImage/101.jpg';
import DEMO1 from '../testImage/DEMO1.jpeg';
import DEMO2 from '../testImage/DEMO2.png';
import DEMO3 from '../testImage/DEMO3.jpeg';
import DEMO4 from '../testImage/DEMO4.jpeg';
import DEMO5 from '../testImage/DEMO5.jpeg';
import DEMO6 from '../testImage/DEMO6.jpeg';
import DEMO7 from '../testImage/DEMO7.jpg';
import DEMO9 from '../testImage/DEMO9.jpg';
import DEMO10 from '../testImage/DEMO10.jpg';
import DEMO11 from '../testImage/DEMO11.jpg';
import DEMO12 from '../testImage/DEMO12.jpg';
import DEMO13 from '../testImage/DEMO13.jpg';
import DEMO14 from '../testImage/DEMO14.jpg';
import DEMO15 from '../testImage/DEMO15.jpg';
const dummyPosts=[
    {
        title:'北海岸一日遊',
        subtitle: '美食、美景、輕鬆遊玩',
        creator:'John',
        createdAt:'2020/11/10',
        description:'給予只擁有短暫假期的台北人，一點喘息的空間，從北車出發，晚上7點左右結束，給明天還要上班的你一點喘息的空間',
        imageUrl:DEMO1,
        steps:[
            {
                title:'台北火車站',
                subtitle: '旅行起點',
                creator:'John',
                createdAt:'2020/11/10',
                description:'可以搭乘公車、捷運、火車的好地點，做為起點再好不過。',
                imageUrl:DEMO2
            },{
                title:'九份',
                subtitle: '近郊獨特氛圍',
                creator:'John',
                createdAt:'2020/11/10',
                description:'可以享受到美食美景以及日式特別氛圍的好地方。',
                imageUrl:DEMO3
            },{
                title:'水湳洞',
                subtitle: '陰陽海',
                creator:'John',
                createdAt:'2020/11/10',
                description:'往山面看有綿延山脈的13層遺跡，往海上看，可以一覽陰陽海。',
                imageUrl:DEMO4
            },{
                title:'忘憂谷',
                subtitle: '私房點',
                creator:'John',
                createdAt:'2020/11/10',
                description:'山谷的地形形成大隱於市中的秘境，可以一覽太平洋與峭壁的美景。',
                imageUrl:DEMO5
            },{
                title:'基隆夜市',
                subtitle: '吃',
                creator:'John',
                createdAt:'2020/11/10',
                description:'吃天一香滷肉飯，營養三明治去瑞芳吃就好。',
                imageUrl:DEMO6
            }
        ]
    }
]


const MyPosts=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [posts, setPosts] = useState(dummyPosts);
    const auth = useContext(AuthContext);
    const history= useHistory();
    const handleDelete=async (pid)=>{
        alert('delete');
        setPosts( preposts=> preposts.filter(p=>p.id!==pid) );
    }

    

    return (
        <Grid container  >
            <Backdrop  open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {
                posts.map(p=>{
                    return (
                        <Grid key={p.id} item xs={12}>
                            <MyPostItem content={p} handleDelete={handleDelete}/>
                        </Grid>
                    )
                })
            }  
        </Grid>
    );
}


export default MyPosts;