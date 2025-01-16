import {createContext, useContext, useReducer} from "react";
import PropTypes from "prop-types";

// Context 생성
export const DateContext = createContext();
export const DateDispatchContext = createContext();

// 초기 상태: 현재 날짜
const initialDateState = {
    selectedDate: new Date()
}

// Reducer 함수
const dateReducer = (state, actor) => {
    const { selectedDate } = state;

    switch (actor.type) {
        // 이전 달로 이동 (2024.08까지만 이동 가능)
        case 'MOVE_PREV_DATE':
            if (selectedDate.getFullYear() === 2024 && selectedDate.getMonth() === 7) {
                return state;
            }

            return {
                ...state,
                selectedDate: new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() - 1,
                    1
                )
            };

        // 다음 달로 이동 (2025.01까지만 이동 가능)
        case 'MOVE_NEXT_DATE':
            if (selectedDate.getFullYear() === 2025 && selectedDate.getMonth() === 0) {
                return state;
            }

            return {
                ...state,
                selectedDate: new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() + 1,
                    1
                )
            };

        default:
            throw new Error(`Unhandled action type: ${actor.type}`);
    }
};

// Provider 컴포넌트 생성
export const DateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dateReducer, initialDateState);

    return (
        <DateContext.Provider value={state}>
            <DateDispatchContext.Provider value={dispatch}>
                { children }
            </DateDispatchContext.Provider>
        </DateContext.Provider>
    )
}

DateProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// 5. 커스텀 훅 생성
export const useDate = () => useContext(DateContext);
export const useDateDispatch = () => useContext(DateDispatchContext);