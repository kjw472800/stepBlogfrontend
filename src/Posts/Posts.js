import { Grid,Backdrop,CircularProgress } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import PostItem from './PostItem';
import { useHttpClient } from '../shared/hooks/http-hook';
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
        createdAt:'2020/11/5',
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
    },
    {
        title:'紅線一日遊',
        subtitle: '沿紅線而上超方便',
        creator:'Kevin',
        createdAt:'2020/11/10',
        description:'早上逛逛故宮、下午玩玩淡水，晚上好好休息',
        imageUrl:DEMO7,
        steps:[
            {
                title:'故宮博物院',
                subtitle: '計程車很坑',
                creator:'Peter',
                createdAt:'2020/11/10',
                description:'豐富的古物、便捷的交通，可以作為一天早上景點，傍晚可以延伸向上去淡水的看日落',
                imageUrl:DEMO11
            },{
                title:'淡水老街',
                subtitle: '魚酥與阿給',
                creator:'John',
                createdAt:'2020/11/10',
                description:'適合買買紀念零食，吃吃美食的地方',
                imageUrl:DEMO12
            },{
                title:'漁人碼頭',
                subtitle: '日落',
                creator:'Kevin',
                createdAt:'2020/11/10',
                description:'可以看到美麗日落的不錯地方。',
                imageUrl:DEMO13
            }
        ]
    },
    {
        title:'半日行',
        subtitle: '輕鬆走走',
        creator:'Nobody',
        createdAt:'2020/11/11',
        description:'走',
        imageUrl:DEMO15,
        steps:[
            {
                title:'故宮博物院',
                subtitle: '計程車很坑',
                creator:'Peter',
                createdAt:'2020/11/10',
                description:'豐富的古物、便捷的交通，可以作為一天早上景點，傍晚可以延伸向上去淡水的看日落',
                imageUrl:DEMO11
            },{
                title:'饒河街夜市',
                subtitle: '台北最強夜市',
                creator:'Peter',
                createdAt:'2020/11/10',
                description:'號稱台北最好的夜市，交通相對不便，但值得。',
                imageUrl:DEMO9
            }
        ]
    }
]

const Posts=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [posts, setPosts] = useState(dummyPosts);

  
    return (
        <Grid container  >
            <Backdrop  open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {
                posts.map(p=>{
                    return (
                        <Grid key={p.id} item xs={12}>
                            <PostItem content={p}/>
                        </Grid>
                    )
                })
            }  
        </Grid>
    );
}

export default Posts;