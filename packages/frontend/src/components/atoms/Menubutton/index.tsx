'use client'
import React from "react";

export const MenuButton: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {

    const handleMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div
            className={`fixed z-10 top-0 left-0 h-screen w-[175px] bg-[#000] text-[12px] transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={handleMenuClick}
        >
            <ul className="p-[10px] space-y-[20px]">
                <span className="flex">
                    <li>
                        <a>本部管理</a>
                    </li>
                    <img src="/imagestask/icon/ico_close.svg" className="w-[15px] h-[15p] ml-[90px] hover:opacity-50" onClick={onClose} />
                </span>
                <li>
                    <a>予算管理</a>
                </li>
                <li>
                    <a>ワークスケジュール作成</a>
                </li>
                <li>
                    <a>シフト表(日別)</a>
                </li>
                <li>
                    <a>タスク分担表(作業別)</a>
                </li>
                <li>
                    <a>基本設定</a>
                </li>
                <li className="space-y-[20px]">
                    <a>ファイル</a>
                    <ul className="space-y-[20px] pl-[10px]">
                        <li>
                            <a>計画を開く</a>
                        </li>
                        <li>
                            <a>最適化履歴を開く</a>
                        </li>
                        <li>
                            <a>計画を作成</a>
                        </li>
                        <li>
                            <a>計画編集</a>
                        </li>
                        <li>
                            <a>別ユニットを開く</a>
                        </li>
                        <li>
                            <a>閉じる</a>
                        </li>
                        <li>
                            <a>ログアウト</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
