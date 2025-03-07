/**
 * Copyright (C) 2025 Shyam Katti
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    defaultContainer: {
        height: 5,
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        marginRight: "1%",
        maxWidth: Dimensions.get("window").width,
        flex: 1,
        // justifyContent: 'space-evenly',
    }
});

export default styles;