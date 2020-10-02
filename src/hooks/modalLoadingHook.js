import { useState } from 'react';
import { useStore } from 'outstated';

function modalLoadingStore() {
    const [modalLoading, setModalLoading] = useState(false);
    return { modalLoading, setModalLoading };
}

function useModalLoading() {
    return useStore(modalLoadingStore);
}

export { modalLoadingStore, useModalLoading };