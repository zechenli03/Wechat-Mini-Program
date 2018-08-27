#!/usr/bin/env bash

ICON_COLOR='#80848f'
SELECTED_COLOR='#2d8cf0'

for i in camera person view_day
do
  sed -i "s/fill=\"#000000\"/fill=\"${ICON_COLOR}\"/g" ${i}.svg
  convert -density 324 -background none ${i}.svg ${i}.png
  sed -i "s/fill=\"${ICON_COLOR}\"/fill=\"${SELECTED_COLOR}\"/g" ${i}.svg
  convert -density 324 -background none ${i}.svg ${i}_selected.png
  sed -i "s/fill=\"${SELECTED_COLOR}\"/fill=\"#000000\"/g" ${i}.svg
done
