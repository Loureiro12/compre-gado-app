import styled from "styled-components/native";

interface TagProps {
  color: string;
  select: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
  margin-top: 30px;
`;

export const ContainerTag = styled.View``;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-top: 28px;
  margin-bottom: 16px;
`;

export const CardTag = styled.TouchableOpacity<TagProps>`
  width: 53px;
  height: 28px;
  border-radius: 6px;
  background-color: ${({ color }) => (color ? color : "#FFF")};
  margin-right: 5px;
  margin-bottom: 10px;
  border: 2px solid white;
  border-color: ${({ select }) => (select ? "#000" : "#FFF")};
`;

export const TagSelect = styled.View`
  flex-direction: row;
  flex-direction: row;
  gap: 10px;
`;

export const ButtonSave = styled.View`
  margin-top: 20px;
`;
