import { RouterState } from 'react-router-redux';
import { EntitiesState } from '../redux/modules/entities';
import { EmotionsState } from '../redux/modules/emotions';
import { SessionState } from '../redux/modules/session';

export interface StoreState {
  routing: RouterState;
  entities: EntitiesState;
  emotions: EmotionsState;
  session: SessionState;
}
