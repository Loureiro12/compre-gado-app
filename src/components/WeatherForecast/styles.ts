import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
`;

export const TextLoadingHourly = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin-left: 10px;
`;

export const LoadingHourly = styled.ActivityIndicator``;

export const LocationDeniedText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const LocationDeniedBtn = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  margin-top: 10px;
`;

export const ContainerLocationDenied = styled.View`
  flex-direction: column;
  max-width: 100%;
`