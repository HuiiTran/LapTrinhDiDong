import React, {Component} from 'react';

import {ScrollView, Text, View, FlatList} from 'react-native';

class SubjectList extends Component<{}, {data: {ten: string; soTiet: string}}> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        ten: 'Hello',
        soTiet: '3',
      },
    };
  }
  subjectData = [
    {Ten: 'Lập trình di động', soTietHoc: '1,2,3,4', date: '2'},
    {Ten: 'Nhập môn lập trình', soTietHoc: '6.7.8', date: '3'},
    {Ten: 'Cấu trúc dữ liệu và giải thuật', soTietHoc: '1,2,3,4', date: '4'},
    {Ten: 'Nhập môn lập trình game', soTietHoc: '1,2,3,4', date: '5'},
    {Ten: 'Mẫu thiết kế', soTietHoc: '1,2,3,4', date: '7'},
    {Ten: 'Kiến trúc phần mềm', soTietHoc: '1,2,3,4', date: '2'},
    {Ten: 'Nhập môn công nghệ phần mềm', soTietHoc: '1,2,3,4', date: '6'},
    {Ten: 'Quản lí phát triển phần mềm', soTietHoc: '1,2,3,4', date: '3'},
    {Ten: 'Kiểm thử phầm mềm', soTietHoc: '1,2,3,4', date: '4'},
  ];
  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.subjectData}
          // ListHeaderComponent={}
          // ListFooterComponent={}
          renderItem={({item}) => (
            <View
              style={{
                margin: '2%',
                borderWidth: 1,
                padding: '5%',
              }}>
              <Text>Tên môn: {item.Ten}</Text>
              <Text>Thứ: {item.date}</Text>
              <Text>Tiết học: {item.soTietHoc}</Text>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}

export default SubjectList;
