import{Routes, RouterModule} from '@angular/router'
import { MainComponent } from './main/main.component';
const rout:Routes=[
    {
        path:":id",
        component:MainComponent
    }
]
export const RModule=RouterModule.forRoot(rout)