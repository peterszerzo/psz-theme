# Rhino script to convert a latitude-longitude plane drawing into a
#   GeoJson. Many features only work for triangles.

import math
import string
import json
import decimal
import rhinoscriptsyntax as rs

def is_clockwise_triangle(coordinates):
	pt_1 = coordinates[0]
	pt_2 = coordinates[1]
	pt_3 = coordinates[2]
	side_1 = [ pt_2[0] - pt_1[0], pt_2[1] - pt_1[1] ]
	side_2 = [ pt_3[0] - pt_2[0], pt_3[1] - pt_2[1] ]
	cross_1_2 = side_1[0] * side_1[1] + side_2[0] * side_2[1]
	return (cross_1_2 > 0);

def ensure_counter_clockwise_triangle(coordinates):
	if (is_clockwise_triangle(coordinates)):
		coordinates[1], coordinates[2] = coordinates[2], coordinates[1]
	return coordinates

# Returns polyline coordinates.
def get_polyline_coordinates(polyline, include_last_point = True):
	coordinates = []
	pts = rs.CurvePoints(polyline)
	for pt in pts:
		x = float('%.2f' % pt[0])
		y = float('%.2f' % pt[1])
		coordinates.append([ x, y ])
	# del coordinates[-1]
	ensure_counter_clockwise_triangle(coordinates)
	return coordinates

def get_coordinates(base_layer):
	coordinates = []
	layer_name = base_layer
	geometry = rs.ObjectsByLayer(layer_name)
	for item in geometry:
		coordinates.append(get_polyline_coordinates(item, False))
	return coordinates

# Write a file in the folder of the current model.
#   - file_name includes extension.
def write_file(file_name, content):
	path = rs.DocumentPath()
	name = rs.DocumentName()
	# save to public
	path = path + "/" + file_name
	f = open(path, "w")
	f.write(content)
	f.close()

def Main():
	write_file('geo.json', json.dumps(get_coordinates('geo')))

Main()
