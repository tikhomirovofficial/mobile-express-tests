import React, { FC } from 'react'
import { TouchableOpacity, View, StyleSheet, Text, Linking } from 'react-native'
import { cs } from '../../common/styles'
import { useAppTheme } from '../../hooks/useTheme'
import { DocumentIcon } from '../../icons'
import { fs } from '../../navigation/AppNavigator'

type DocumentItemProps = {
    neededBorder?: boolean
    title: string
    to?: string
}

export const DocumentItem: FC<DocumentItemProps> = ({ neededBorder = true, title = "", to = "" }) => {
    const theme = useAppTheme()

    return (
        <TouchableOpacity onPress={to ? () => Linking.openURL(to) : undefined} style={[cs.dF, cs.fRow, cs.fAlCenter, cs.spaceM, styles.documentItem, (neededBorder ? cs.bottomBorder : null)]}>
            <View style={[styles.documentIcon, cs.circle, cs.fCenterCol]}>
                <DocumentIcon />
            </View>
            <Text style={[styles.documentFile, cs.fzS, fs.montR, cs.colorBlack, { color: theme.title }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    inputField: {
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderStyle: "solid",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E2E2E9"
    },
    selectableBtn: {
        minWidth: 144,
        height: 52
    },
    profileInfo: {
        maxWidth: 228
    },
    avatarBlock: {
        backgroundColor: cs.rootBg.backgroundColor,
        height: 80,
        width: 80,
    },
    documentItem: {
        paddingBottom: 16
    },
    block: {
        height: 80,
    },
    bonuses: {
        paddingHorizontal: 15,
        paddingVertical: 6
    },
    profileHubItem: {
        paddingVertical: 14,
        borderRadius: 16,
        overflow: "hidden",
        gap: 18,
        minWidth: 140
    },
    versionBlock: {
        gap: 70
    },
    documentIcon: {
        height: 40,
        width: 40,
        overflow: "hidden",
        backgroundColor: cs.rootBg.backgroundColor
    },
    profileDataBlock: {
        minHeight: "100%"
    },
    documentFile: {
        maxWidth: 180
    },
    aboutAppContent: {
        flex: 1,
    }
})